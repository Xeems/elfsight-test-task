import styled from 'styled-components';
import { BaseInputStyles } from './Input';
import { useCallback, useRef, useState } from 'react';
import { useOutsideClick } from '../../hooks';

export function Select({ value, name, onChange, placeholder, options = [] }) {
  const [open, setOpen] = useState(false);

  const ref = useRef(null);
  useOutsideClick(ref, () => {
    setOpen(false);
  });

  const handleChange = useCallback(
    (e) => {
      const selectedValue = String(e.currentTarget.dataset.value);
      onChange(name, selectedValue);
      setOpen(false);
    },
    [name, onChange]
  );

  const clearValue = useCallback(
    (e) => {
      e.stopPropagation();
      onChange(name, '');
      setOpen(false);
    },
    [name, onChange]
  );

  const handleOpen = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  return (
    <Wrapper ref={ref}>
      <Box onClick={handleOpen} $empty={!value}>
        <Text>{value || placeholder}</Text>

        <IconWrapper>
          {value ? (
            <ClearIcon onClick={clearValue}>✕</ClearIcon>
          ) : (
            <Arrow open={open}>❯</Arrow>
          )}
        </IconWrapper>
      </Box>

      {open && (
        <Dropdown>
          {options.map((opt) => (
            <Item
              key={opt}
              data-value={opt}
              onClick={handleChange}
              $active={value === opt}
            >
              {opt}
            </Item>
          ))}
        </Dropdown>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;

const Box = styled.div`
  ${BaseInputStyles}

  display: flex;
  align-items: center;
  justify-content: space-between;

  cursor: pointer;
  color: ${({ $empty }) => ($empty ? '#aaa' : '#fff')};
`;

const Text = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const IconWrapper = styled.div`
  transform: rotate(90deg);
  display: flex;
  align-items: center;
  gap: 6px;
`;

const Arrow = styled.span`
  transition: 0.2s;
  transform: ${({ open }) => (open ? 'rotate(180deg)' : 'rotate(0deg)')};
  color: #aaa;

  ${Box}:hover & {
    color: #83bf46;
  }
`;

const ClearIcon = styled.span`
  font-size: 14px;
  cursor: pointer;
  color: #aaa;
  transition: 0.2s;

  &:hover {
    color: #83bf46;
  }
`;

const Dropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;

  background: white;
  border: 1px solid #83bf46;
  z-index: 10;

  max-height: 200px;
  overflow-y: auto;
  overflow-x: hidden;

  scrollbar-width: thin;
  scrollbar-color: #d9d9d9 transparent;
`;

const Item = styled.div`
  padding: 10px;
  cursor: pointer;
  color: black;

  font-weight: ${({ $active }) => ($active ? '700' : '400')};
  background: ${({ $active }) => ($active ? '#83BF4633' : 'transparent')};

  &:hover {
    background: #83bf4633;
  }
`;
