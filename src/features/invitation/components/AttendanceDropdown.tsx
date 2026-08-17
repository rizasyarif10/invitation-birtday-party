import { useEffect, useRef, useState } from "react";
import type { AttendanceValue } from "@/features/invitation/types";

const OPTIONS = [
  { value: "hadir", label: "Yes, I’ll be there", icon: "✓" },
  { value: "tidak-hadir", label: "Sorry, I can’t attend", icon: "×" },
] as const;

type AttendanceDropdownProps = {
  value: AttendanceValue | "";
  hasError: boolean;
  disabled?: boolean;
  onChange: (value: AttendanceValue) => void;
};

export function AttendanceDropdown({
  value,
  hasError,
  disabled = false,
  onChange,
}: AttendanceDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const selectedOption = OPTIONS.find((option) => option.value === value);

  useEffect(() => {
    if (!isOpen) return;

    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) setIsOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen]);

  const selectOption = (nextValue: AttendanceValue) => {
    onChange(nextValue);
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  return (
    <div ref={dropdownRef} className="relative mt-2">
      <input type="hidden" name="attendance" value={value} />
      <button
        ref={triggerRef}
        id="attendance-select"
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls="attendance-options"
        aria-labelledby="attendance-label attendance-select"
        disabled={disabled}
        onClick={() => setIsOpen((current) => !current)}
        className={`flex min-h-12 w-full items-center justify-between gap-3 rounded-xl border bg-[#fffaf0] px-4 text-left text-sm font-semibold outline-none transition focus:ring-4 disabled:cursor-wait disabled:opacity-65 ${
          hasError
            ? "border-[#c4442b] text-[#7d2b1d] focus:border-[#c4442b] focus:ring-[#c4442b]/15"
            : "border-[#dfc29c] text-[#5f3e29] focus:border-[#cc5a15] focus:ring-[#e57b30]/15"
        }`}
      >
        <span className={selectedOption ? "text-[#4b2d1b]" : "text-[#9d806a]"}>
          {selectedOption?.label ?? "Select your response"}
        </span>
        <span
          className={`grid size-7 shrink-0 place-items-center rounded-lg bg-[#f2dbb7] text-[#8f461b] transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          aria-hidden="true"
        >
          <span className="block size-2 -translate-y-px rotate-45 border-r-2 border-b-2 border-current" />
        </span>
      </button>

      {isOpen && (
        <div
          id="attendance-options"
          role="listbox"
          aria-labelledby="attendance-label"
          className="dropdown-menu-open absolute inset-x-0 top-[calc(100%+0.5rem)] z-50 overflow-hidden rounded-xl border border-[#d9b789] bg-[#fffdf7] p-1.5 shadow-[0_18px_45px_rgba(70,34,13,0.22)]"
        >
          {OPTIONS.map((option) => {
            const isSelected = option.value === value;
            return (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => selectOption(option.value)}
                className={`flex min-h-12 w-full items-center gap-3 rounded-lg px-3 text-left text-sm font-semibold transition ${
                  isSelected
                    ? "bg-[#f6d7a9] text-[#71340f]"
                    : "text-[#60402c] hover:bg-[#fff1db] focus:bg-[#fff1db] focus:outline-none"
                }`}
              >
                <span
                  className={`flex size-8 shrink-0 items-center justify-center rounded-lg text-base font-black ${isSelected ? "bg-[#a74411] text-white" : "bg-[#f3e4ce] text-[#9b562a]"}`}
                  aria-hidden="true"
                >
                  {option.icon}
                </span>
                <span>{option.label}</span>
                {isSelected && (
                  <span className="ml-auto text-[#a74411]" aria-hidden="true">
                    ●
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
