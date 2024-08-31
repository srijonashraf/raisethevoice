type ValidationLineProps = {
  text?: string;
  style?: any;
};

export default function ValidationLine({ text, style }: ValidationLineProps) {
  return text ? (
    <p className="text-[13px] text-red-400 mt-2 px-1" style={style}>
      {text}
    </p>
  ) : null;
}
