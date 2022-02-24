import ReactDom from 'react-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const WarningModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  max-width: 100%;
  max-height: 100%;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Modal = ({ children, isOpen, close }) => {
  const targetElement = document.getElementById('portal');

  return isOpen ? ReactDom.createPortal(
    <WarningModal onClick={close}>
      {children}
    </WarningModal>,
    targetElement,
  ) : null;
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
};
