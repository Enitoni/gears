import { Descriptor } from "../types/Descriptor"
import { ModuleDescriptor } from "../types/ModuleDescriptor"
import { categorize } from "../../../common/lang/array/categorize"

export const categorizeDescriptorKind = <T extends ModuleDescriptor>(descriptor: T) =>
  categorize(descriptor.children, child => child.kind) as {
    [K in Extract<Descriptor, T["children"][0]>["kind"]]: Extract<
      Descriptor,
      { kind: K }
    >[]
  }
