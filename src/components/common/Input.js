import { useCallback } from 'react';
import styled, { css } from 'styled-components';

export function Input({ name, onChange, ...props }) {
  const handleChange = useCallback(
    (e) => {
      onChange(name, e.target.value);
    },
    [name, onChange]
  );

  return <StyledInput onChange={handleChange} {...props} />;
}

export const BaseInputStyles = css`
  height: 40px;
  padding: 0 12px;
  border-radius: 8px;
  border: solid 1px #83bf46;

  font-size: 14px;
  color: #fff;

  background: #263750;
  outline: none;

  transition: 0.2s;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &::placeholder {
    color: #aaa;
  }

  &:hover {
    background: #334466;
  }

  &:focus {
    background: #334466;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const StyledInput = styled.input`
  ${BaseInputStyles}
`;
