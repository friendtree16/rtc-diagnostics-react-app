import { Edge } from './types';
import { Connection } from 'twilio-client';

export const DEFAULT_EDGES: Edge[] = ['roaming'];

export const DEFAULT_CODEC_PREFERENCES: Connection.Codec[] = [Connection.Codec.PCMU, Connection.Codec.Opus];
