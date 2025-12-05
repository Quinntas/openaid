import {randomUUID} from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

export async function tempFile<T>(
  url: string,
  callback: (file: Buffer, filePath: string) => Promise<T> | T,
  options?: {
    headers?: Headers;
    timeout?: number;
  }
): Promise<T> {
  const tempDir = os.tmpdir();
  const fileName = `temp-${randomUUID()}`;
  const tempFilePath = path.join(tempDir, fileName);

  try {
    const headers =
      options?.headers ||
      new Headers({
        Accept: "*/*",
      });

    let controller: AbortController | undefined;
    let timeoutId: NodeJS.Timeout | undefined;

    if (options?.timeout) {
      controller = new AbortController();
      timeoutId = setTimeout(() => controller?.abort(), options.timeout);
    }

    try {
      const response = await fetch(url, {
        method: "GET",
        headers,
        signal: controller?.signal,
      });

      if (!response.ok) throw new Error(`Failed to download file: ${response.status}`);

      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      await fs.promises.writeFile(tempFilePath, buffer);

      return await callback(buffer, tempFilePath);
    } finally {
      if (timeoutId) clearTimeout(timeoutId);
    }
  } finally {
    if (fs.existsSync(tempFilePath)) fs.unlinkSync(tempFilePath);
  }
}

export function createTempReadStream<T>(
  url: string,
  callback: (readStream: fs.ReadStream, buffer: Buffer, filePath: string) => Promise<T> | T,
  options?: {
    headers?: Headers;
    timeout?: number;
  }
): Promise<T> {
  return tempFile<T>(
    url,
    (buffer, filePath) => {
      const readStream = fs.createReadStream(filePath);
      return callback(readStream, buffer, filePath);
    },
    options
  );
}

export async function tempFileFromBuffer<T>(
  buffer: Buffer,
  callback: (filePath: string) => Promise<T> | T
): Promise<T> {
  const tempDir = os.tmpdir();
  const fileName = `temp-${randomUUID()}`;
  const tempFilePath = path.join(tempDir, fileName);

  try {
    await fs.promises.writeFile(tempFilePath, buffer);
    return await callback(tempFilePath);
  } finally {
    if (fs.existsSync(tempFilePath)) {
      try {
        fs.unlinkSync(tempFilePath);
      } catch (error) {
        // Ignore error if file is locked
      }
    }
  }
}
