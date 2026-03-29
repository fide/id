/**
 * Fide ID constants.
 */
import {
  FIDE_ENTITY_TYPES,
  FIDE_VOCABULARY,
  type FideEntityTypeName,
  type FideEntityTypeSpec,
} from "@fide-work/vocabulary";

const ENTITY_TYPE_ENTRIES = Object.entries(FIDE_ENTITY_TYPES) as [FideEntityTypeName, FideEntityTypeSpec][];

export { FIDE_VOCABULARY, FIDE_ENTITY_TYPES };

export const FIDE_NAMESPACE_URL = FIDE_VOCABULARY.namespaceUrl;
export const FIDE_SPEC_VERSION = FIDE_VOCABULARY.specVersion;
export const FIDE_SPEC_DATE = FIDE_VOCABULARY.specDate;

export const FIDE_ENTITY_TYPE_MAP = Object.fromEntries(
  ENTITY_TYPE_ENTRIES.map(([name, spec]) => [name, spec.code]),
) as { [K in FideEntityTypeName]: (typeof FIDE_ENTITY_TYPES)[K]["code"] };

export const FIDE_CHAR_TO_ENTITY_TYPE = Object.fromEntries(
  ENTITY_TYPE_ENTRIES.map(([name, spec]) => [spec.code, name]),
) as Record<FideEntityTypeSpec["code"], FideEntityTypeName>;

export const FIDE_ID_PREFIX = "did:fide:0x" as const;
export const FIDE_ID_HEX_LENGTH = 40;
export const FIDE_ID_LENGTH = FIDE_ID_PREFIX.length + FIDE_ID_HEX_LENGTH;
export const FIDE_ID_FINGERPRINT_LENGTH = 36;
