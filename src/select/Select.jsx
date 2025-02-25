import { useEffect, useRef, useState } from "react";
import { ChevronDown, CircleX } from "lucide-react";
import "./select.style.css";

const Select = ({
  options = [],
  handleChange,
  label = "select",
  required = true,
}) => {
  const [selectedItem, setSelectedItem] = useState("");
  const [open, setOpen] = useState(false);
  const [searchedOptions, setSearchedOptions] = useState(options);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const optionRefs = useRef([]);
  const [dropdownDirection, setDropdownDirection] = useState("down");

  const selectRef = useRef(null);
  const dropdownRef = useRef(null);
  useEffect(() => {
    if (open && selectRef.current && dropdownRef.current) {
      const selectRect = selectRef.current.getBoundingClientRect();
      const dropdownHeight = dropdownRef.current.scrollHeight;
      const windowHeight = window.innerHeight;

      if (selectRect.bottom + dropdownHeight > windowHeight) {
        setDropdownDirection("up"); // Not enough space below, open upwards
      } else {
        setDropdownDirection("down"); // Enough space below, open downwards
      }
    }
  }, [open]);

  useEffect(() => {
    if (open) setHighlightIndex(-1);
  }, [open]);

  useEffect(() => {
    if (open && highlightIndex >= 0 && optionRefs.current[highlightIndex]) {
      optionRefs.current[highlightIndex].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [highlightIndex, open]);

  const clearSelectedValue = () => {
    setSelectedItem("");
    setHighlightIndex(-1);
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    setSelectedItem(value);
    const filteredData = options.filter((option) =>
      option?.name?.toLowerCase()?.includes(value)
    );
    setSearchedOptions(filteredData);
  };

  const handleKeyDown = (e) => {
    if (!open) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightIndex((prev) =>
          Math.min(prev + 1, searchedOptions.length - 1)
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightIndex((prev) => Math.max(prev - 1, 0));
        break;
      case "Enter":
        e.preventDefault();
        if (highlightIndex >= 0 && searchedOptions[highlightIndex]) {
          handleChange(searchedOptions[highlightIndex]);
          setSelectedItem(searchedOptions[highlightIndex]?.name);
          setOpen(false);
        }
        break;

      default:
        break;
    }
  };

  return (
    <div ref={selectRef}>
      <label htmlFor={`select-${label}`}>
        {label}
        {required && <span>*</span>}
      </label>
      <div
        className="select-container"
        onClick={() => setOpen((prev) => !prev)}
        onBlur={() => setOpen(false)}
        onKeyDown={handleKeyDown}
      >
        <div className="header">
          <input
            id={`select-${label}`}
            type="text"
            className="search"
            onChange={handleSearch}
            onMouseDown={(e) => e.stopPropagation()}
            value={selectedItem}
            placeholder="Select / Search..."
          />
          {selectedItem ? (
            <button
              onClick={(e) => {
                clearSelectedValue();
                e.stopPropagation();
              }}
              type="button"
              className="close"
            >
              <CircleX />
            </button>
          ) : (
            <div className={open ? "arrow-up" : "arrow-down"}>
              <ChevronDown />
            </div>
          )}
        </div>
        <div
          ref={dropdownRef}
          className={`selected-item-container ${
            open ? "open" : "close"
          } ${dropdownDirection}`}
        >
          {searchedOptions?.length > 0 ? (
            searchedOptions?.map((option, index) => {
              return (
                <button
                  className={`select-item ${
                    highlightIndex === index && "highlighted-item"
                  }`}
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleChange(option);
                    setSelectedItem(option?.name);
                    setOpen(false);
                  }}
                  key={option?.id}
                  ref={(el) => (optionRefs.current[index] = el)}
                >
                  <p>{option?.name}</p>
                </button>
              );
            })
          ) : (
            <div className="select-item">No data found</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Select;
