import { CallSignatureDescriptor } from "./CallSignatureDescriptor"
import { BaseModuleDescriptor } from "./ModuleDescriptor"

export interface FunctionDescriptor extends BaseModuleDescriptor<"Function"> {
  signatures: CallSignatureDescriptor[]
}
