import { showModal, hideModal } from "@/stores/ModalStore";
import React from "react";
import FilterPopup from "../modal/FilterPopup";

interface SectionHeaderProps {
  title: string;
  description?: string;
}

export default function SectionHeader({ title }: SectionHeaderProps) {
  const handleFilterClick = () => {
    showModal({
      component: (
        <FilterPopup
          onClose={hideModal}
          onApply={(categories, tags) => {
            console.log({ categories, tags });
            hideModal();
          }}
        />
      ),
    });
  };

  return (
    <div className="flex items-center justify-between border-b border-[#E1E1E7] pb-4">
      <h2 className="text-2xl font-bold text-[#374254]">{title}</h2>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-4">
          <button className="flex h-10 items-center justify-center text-base font-medium leading-none text-[#6F7C90]">
            인기순
          </button>
          <button className="flex h-10 items-center justify-center text-base font-medium leading-none text-[#6F7C90]">
            최신순
          </button>
        </div>
        <div>
          <button
            onClick={handleFilterClick}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F7F7FA]"
          >
            <svg
              width="30"
              height="30"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.6666 5L7.49992 5"
                stroke="#374254"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M16.6666 10L7.49992 10"
                stroke="#374254"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M16.6666 15L7.49992 15"
                stroke="#374254"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M4.16675 5L4.16675 5.00667"
                stroke="#374254"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M4.16675 10L4.16675 10.0067"
                stroke="#374254"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M4.16675 15L4.16675 15.0067"
                stroke="#374254"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
