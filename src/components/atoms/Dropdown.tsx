import { React, useState} from "react";
import { UpArrowIcon } from "../icons/UpArrowIcon";
import { DownArrowIcon } from "../icons/DownArrowIcon";

type DropdownVariant = "primary";

type StatusVariant = "Pending" | "Approved" | "Completed" | "Rejected";
const StatusOptions: StatusVariant[] = ["Pending", "Approved", "Completed", "Rejected"];

const StatusColorStyles: Record<StatusVariant, { bg: string, text: string; dot: string }> = {
  Pending:
    { bg: "bg-[#FFDAC3]", text: "text-[#A43E00]", dot: "bg-[#FD8033]"},
  Approved:
    { bg: "bg-[#FFEBC8]", text: "text-[#7B5F2E]", dot: "bg-[#FFBE4C]"},
  Completed:
    { bg: "bg-[#ECFDF3]", text: "text-[#037847]", dot: "bg-[#14BA6D]"},
  Rejected:
    { bg: "bg-[#FFD2D2]", text: "text-[#8D0402]", dot: "bg-[#D40400]"},
};

const StatusPill = ({
  status,
  onClick,
}: {
  status: StatusVariant;
  onClick?: () => void;
}) => {
  const baseStyles = "py-1 pl-2 pr-2 w-max rounded-full text-sm font-medium flex items-center";
  const dotStyles = "w-1.5 h-1.5 rounded-full mr-2";
  const colorStyles = StatusColorStyles[status];
  
  return (
    <div
      className="w-full"
      onClick={onClick}
    >
      <span className={`${baseStyles} ${colorStyles.bg} ${colorStyles.text}`}>
        <div className={`${dotStyles} ${colorStyles.dot}`}/>
        {status}
      </span>
    </div>
  );
};

interface DropdownProps {
  variant?: DropdownVariant;
  status?: StatusVariant;
  onChange?: (status: StatusVariant) => void;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
}

export default function Dropdown({
  variant = "primary",
  status = "Pending",
  onChange,
  onBlur,
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  
  const [currentStatus, setCurrentStatus] = useState<StatusVariant>(status);
  
  const baseStyles = "w-full px-2 py-1.5 inline-flex justify-between items-center rounded border bg-[#fcfcfd] hover:bg-[#eff6ff]";
  
  const openStyles: Record<boolean, string> = {
    true:
      "border-[#0070ff]",
    false:
      "border-[#eaecf0]",
  }
  
  return (
    <div className="relative">
      <div
        onClick={() => {
          setOpen(!open);
        }}
        onChange={onChange}
        className={`${baseStyles} ${openStyles[open]}`}
      >
        <StatusPill status={currentStatus} />
        {open ? (
          <UpArrowIcon />
        ) : (
          <DownArrowIcon />
        )}
      </div>

      {open && (
        <div
          className="w-full py-1.5 px-3 flex flex-col gap-2 rounded-b absolute top-full shadow-lg"
        >
          {StatusOptions.map((e) => (
            <StatusPill
              key={e}
              status={e}
              onClick={() => {
                setCurrentStatus(e);
                setOpen(!open);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}