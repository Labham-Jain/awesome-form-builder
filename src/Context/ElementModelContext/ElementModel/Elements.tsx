import { ElementTypes } from "..";
import FormElements from "../../../components/FormElements/FormElements";

interface Props {
  type: ElementTypes;
}
const Elements = ({ type }: Props) => {
  switch (type) {
    case "input.checkbox":
      return <FormElements element="checkbox" valueType="checkbox" />;
    case "input.password":
      return <FormElements element="text" valueType="password" />;
    case "input.url":
      return <FormElements element="text" valueType="url" />;
    case "input.email":
      return <FormElements element="text" valueType="email" />;
    case "input.text":
      return <FormElements element="text" valueType="text" />;
    case "input.number":
      return <FormElements element="text" valueType="number" />;
    case "input.toggle":
      return <FormElements element="toggle" valueType="toggle" />;
    case "input.textarea":
      return <FormElements element="text" valueType="textarea" />;
    case "multi.select":
      return <FormElements element="select" valueType="multi_select" />;
    default:
      return null;
  }
};

export default Elements;
