"use client";
import React from "react";
import PhoneInput, {
  type DefaultInputComponentProps,
  type Props,
} from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { Input } from "@/components/ui/input";

const PhoneInputComponent = React.forwardRef<
  HTMLInputElement,
  DefaultInputComponentProps
>((props, ref) => <Input {...props} ref={ref} />);

PhoneInputComponent.displayName = "PhoneInputComponent";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PhoneInputAsAny = PhoneInput as any;

class CustomPhoneInput extends React.Component<Props<DefaultInputComponentProps>> {
  render() {
    return <PhoneInputAsAny {...this.props} inputComponent={PhoneInputComponent} />;
  }
}

export default CustomPhoneInput;
