import React, { forwardRef, useRef, useState } from "react";
import styled from "styled-components";
import data from "../data/text.json";

const TextWrapper = styled.div`
  width: 75rem;
  margin-top: 1rem;
  /* height: 75vh; */
  overflow-y: scroll;
  overflow-x: hidden;
  box-shadow: rgba(67, 71, 85, 0.27) 0px 0px 0.25em,
    rgba(90, 125, 188, 0.05) 0px 0.25em 1em;
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  border: 1px solid rgb(204, 219, 232);
  position: relative;
  &:focus {
    outline: none;
  }
  &::-webkit-scrollbar {
    -webkit-appearance: none;
  }
  &::-webkit-scrollbar:vertical {
    width: 11px;
  }
  &::-webkit-scrollbar:horizontal {
    height: 11px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 8px;
    border: 2px solid white; /* should match background, can't be transparent */
    background-color: rgba(177, 177, 177, 0.5);
  }
  &::-webkit-scrollbar-track {
    background-color: #fff;
    border-radius: 8px;
  }
`;

const Character = styled.span`
  padding: 3px 4px;
  font-size: 2.5rem;
  font-family: "Quicksand", sans-serif;
  font-weight: 100;
  color: ${(props) =>
    props.state === "current"
      ? "#3395da"
      : props.state === "wrong"
      ? "#d55a61"
      : props.state === "correct"
      ? "#95c590"
      : "gray"};
  background-color: ${(props) =>
    props.state === "current"
      ? "#bce3ff"
      : props.state === "wrong"
      ? "#ffddd9"
      : props.state === "correct"
      ? "#ecf6e7"
      : "white"};
  display: inline-block;
  text-align: center;
  margin: auto;
  border-radius: 5px;
  margin: 1px;
`;

// const Overlay = styled.div`
//   width: 100%;
//   height: 100%;
//   background-color: #ffffffb0;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   position: sticky;
//   bottom: 0;
//   left: 0;
// `;

const TypingBox = forwardRef(
  ({
    currentIndex,
    setCurrentIndex,
    typingContainerRef,
    testStart,
    // setTestStart,
    wrongCharIndexList,
    setWrongCharIndexList,
  }) => {
    const [text, setText] = useState(data[1]);

    const handleTypingContainerOnBlur = () => {
      if (testStart) {
        typingContainerRef?.current.focus();
      }
    };
    const handleKeyPress = (event) => {
      if (testStart) {
        if (event.keyCode === 8 && currentIndex) {
          event.preventDefault();
          setWrongCharIndexList((prevList) =>
            prevList.filter((indexValue) => indexValue !== currentIndex - 1)
          );
          setCurrentIndex((prevCount) => prevCount - 1);
        } else if (
          (48 <= event.keyCode && event.keyCode <= 222) ||
          event.keyCode === 32
        ) {
          if (text[currentIndex] !== event.key) {
            setWrongCharIndexList((prevList) => [...prevList, currentIndex]);
          }
          setCurrentIndex((prevCount) => prevCount + 1);
        }
      }
    };
    return (
      <TextWrapper
        ref={typingContainerRef}
        onBlur={handleTypingContainerOnBlur}
        tabIndex={0}
        onKeyDown={handleKeyPress}
      >
        {text.split("").map((caracter, index) => (
          <Character
            state={
              currentIndex === index
                ? "current"
                : currentIndex > index
                ? wrongCharIndexList.includes(index) //check index is include in wrong character list
                  ? "wrong"
                  : "correct"
                : "unset"
            }
            key={index}
          >
            {caracter}
          </Character>
        ))}
        {/* {!testStart ? <Overlay></Overlay> : null} */}
      </TextWrapper>
    );
  }
);

export default TypingBox;
