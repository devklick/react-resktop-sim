import { useEffect, useState } from "react";
import "./Calculator.scss";

interface CalculatorProps {}

// eslint-disable-next-line no-empty-pattern
function Calculator({}: CalculatorProps) {
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<string>("");

  // Whenever the input changes we'll check if it forms a valid
  // calculation, and if so, add it to the output
  useEffect(() => {
    try {
      const res = eval(input);
      setOutput(res);
    } catch {
      /* empty */
    }
  }, [input]);

  function Button({
    displayChar,
    mathematicalChar,
    action,
  }: {
    mathematicalChar: string | number;
    displayChar?: string;
    action: "append-to-end" | "remove-from-end" | "evaluate" | "clear";
  }) {
    if (displayChar === undefined) {
      displayChar = mathematicalChar.toString();
    }

    function handleClick() {
      switch (action) {
        case "append-to-end":
          setInput(input + mathematicalChar.toString());
          break;
        case "remove-from-end":
          setInput(String(input).slice(0, -1));
          break;
        case "evaluate":
          try {
            setInput(eval(input));
            setOutput("");
          } catch {
            setOutput("Invalid");
          }
          break;
        case "clear":
          setInput("");
      }
    }

    return (
      <div className="calculator__button normal" onClick={handleClick}>
        <span className="calculator_button-contents">{displayChar}</span>
      </div>
    );
  }

  return (
    <div className="calculator">
      <div className="calculator__input">
        <div className="calculator__input-contents">{input}</div>
      </div>
      <div className="calculator__output">
        <div className="calculator__output-contents">{output}</div>
      </div>
      <div className="calculator__buttons">
        <Button mathematicalChar={"AC"} action="clear" />
        {/* <Button mathematicalChar={8} action="append-to-end" />
        <Button mathematicalChar={'%'} action="append-to-end" /> */}
        <div />
        <div />
        <Button mathematicalChar="/" displayChar="÷" action="append-to-end" />

        <Button mathematicalChar={7} action="append-to-end" />
        <Button mathematicalChar={8} action="append-to-end" />
        <Button mathematicalChar={9} action="append-to-end" />
        <Button mathematicalChar="*" displayChar="x" action="append-to-end" />
        <Button mathematicalChar={4} action="append-to-end" />
        <Button mathematicalChar={5} action="append-to-end" />
        <Button mathematicalChar={6} action="append-to-end" />
        <Button mathematicalChar="-" action="append-to-end" />
        <Button mathematicalChar={1} action="append-to-end" />
        <Button mathematicalChar={2} action="append-to-end" />
        <Button mathematicalChar={3} action="append-to-end" />
        <Button mathematicalChar="+" action="append-to-end" />
        <Button mathematicalChar={0} action="append-to-end" />
        <Button mathematicalChar="." action="append-to-end" />
        <Button mathematicalChar="←" action="remove-from-end" />
        <Button mathematicalChar="=" action="evaluate" />
      </div>
    </div>
  );
}

export default Calculator;
