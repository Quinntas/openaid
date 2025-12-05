import {Voices} from "../ai/core/types/languages";

export interface VoiceData {
  gender: "Male" | "Female";
  characteristic: string;
}

export const voicesData: Record<Voices, VoiceData> = {
  [Voices.Zephyr]: {gender: "Male", characteristic: "Bright"},
  [Voices.Puck]: {gender: "Male", characteristic: "Upbeat"},
  [Voices.Charon]: {gender: "Male", characteristic: "Informative"},
  [Voices.Kore]: {gender: "Female", characteristic: "Firm"},
  [Voices.Fenrir]: {gender: "Male", characteristic: "Excitable"},
  [Voices.Leda]: {gender: "Female", characteristic: "Youthful"},
  [Voices.Orus]: {gender: "Male", characteristic: "Firm"},
  [Voices.Aoede]: {gender: "Female", characteristic: "Breezy"},
  [Voices.Callirrhoe]: {gender: "Female", characteristic: "Easy-going"},
  [Voices.Autonoe]: {gender: "Female", characteristic: "Bright"},
  [Voices.Enceladus]: {gender: "Male", characteristic: "Breathy"},
  [Voices.Iapetus]: {gender: "Male", characteristic: "Clear"},
  [Voices.Umbriel]: {gender: "Male", characteristic: "Easy-going"},
  [Voices.Algieba]: {gender: "Female", characteristic: "Smooth"},
  [Voices.Despina]: {gender: "Female", characteristic: "Smooth"},
  [Voices.Erinome]: {gender: "Female", characteristic: "Clear"},
  [Voices.Algenib]: {gender: "Male", characteristic: "Gravelly"},
  [Voices.Rasalgethi]: {gender: "Male", characteristic: "Informative"},
  [Voices.Laomedeia]: {gender: "Female", characteristic: "Upbeat"},
  [Voices.Achernar]: {gender: "Male", characteristic: "Soft"},
  [Voices.Alnilam]: {gender: "Male", characteristic: "Firm"},
  [Voices.Schedar]: {gender: "Male", characteristic: "Even"},
  [Voices.Gacrux]: {gender: "Male", characteristic: "Mature"},
  [Voices.Pulcherrima]: {gender: "Female", characteristic: "Forward"},
  [Voices.Achird]: {gender: "Male", characteristic: "Friendly"},
  [Voices.Zubenelgenubi]: {gender: "Male", characteristic: "Casual"},
  [Voices.Vindemiatrix]: {gender: "Female", characteristic: "Gentle"},
  [Voices.Sadachbia]: {gender: "Female", characteristic: "Lively"},
  [Voices.Sadaltager]: {gender: "Male", characteristic: "Knowledgeable"},
  [Voices.Sulafat]: {gender: "Male", characteristic: "Warm"},
};
