import styled from 'styled-components';

export function Button({ variant = 'default', ...props }) {
  return <StyledButton {...props} $variant={variant} />;
}

const variants = {
  default: {
    color: '#83bf46'
  },
  destroy: {
    color: '#FF5152'
  }
};

const StyledButton = styled.button`
  height: 40px;
  width: 100%;
  border-radius: 8px;
  border: 1px solid;

  transition: 0.2s;

  background: transparent;

  ${({ $variant = 'default' }) => {
    const v = variants[$variant];

    return `
      border-color: ${v.color};
      color: ${v.color};

      &:hover {
        background: ${v.color};
        color: #fff;
      }
    `;
  }};
`;
