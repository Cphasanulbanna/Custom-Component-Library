import Button from "./index.jsx";

export default {
  title: "Components/Button",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  component: Button,
  ArgTypes: {
    onClick: { action: "clicked" },
    children: {
      control: "text",
    },
    disabled: {
      control: "boolean",
    },
  },
};

const Template = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: "Primary",
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: "Secondary",
  variant: "secondary",
  onClick: () => console.log("clicked"),
};

export const Loading = Template.bind({});
Loading.args = {
  children: "Primary",
  loading: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  children: "Disabled",
  disabled: true,
};
