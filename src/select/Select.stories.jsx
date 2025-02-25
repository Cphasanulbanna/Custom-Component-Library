import Select from "./Select.jsx";

export default {
  title: "Components/Select Dropdown",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  component: Select,
};

export const SelectDropdown = {
  args: {
    options: [
      { id: 1, name: "Apple" },
      { id: 2, name: "Banana" },
      { id: 3, name: "Cherry" },
      { id: 4, name: "Date" },
      { id: 5, name: "Elderberry" },
      { id: 6, name: "Fig" },
      { id: 7, name: "Grape" },
      { id: 8, name: "Honeydew" },
      { id: 9, name: "Kiwi" },
    ],
    optionKey: "id", // Renamed from key to optionKey
    handleChange: (selectedOption) => console.log("Selected:", selectedOption),
  },
  //   decorators: [
  //     (Story) => (
  //       <div style={{ position: "absolute", top: "50px", right: "100px" }}>
  //         <Story />
  //       </div>
  //     ),
  //   ],
};
