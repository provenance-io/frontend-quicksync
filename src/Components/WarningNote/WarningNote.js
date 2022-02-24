import { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';
import ReactHtmlParser from 'react-html-parser';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import warning from 'img/warning.svg';
import { Modal } from '../Modal';

const WarningContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
  margin-left: 10px;
`;
const WarningIcon = styled.img`
  height: 18.75px;
  width: auto;
  cursor: pointer;
  transition: 200ms all;
  &:hover {
    filter: brightness(0.6);
  }
`;
const WarningBody = styled.div`
  color: #f3d66b;
  background: #404027;
  padding: 30px;
  border-radius: 4px;
  margin-bottom: 24px;
  width: 800px;
  word-wrap: break-word;
  text-align:left;
  font-size: 1.6rem;
  line-height: 2.8rem;
  position: relative;
  max-width: 100%;
  box-sizing: border-box;
`;
/* eslint-disable-next-line */
const Title = styled.h3`
  color: #ffc800;
  font-weight: bold;
  margin-bottom: 20px;
`;
const Close = styled.div`
  position: absolute;
  top: 10px;
  right: 20px;
  font-size: 1.3rem;
  color: #498afd;
  z-index: 100;
  cursor: pointer;
  user-select: none;
`;
/* eslint-disable-next-line */
const Code = styled.span`
  background: #191b28;
  padding: 2px 6px;
  border-radius: 3px;
  color: #ffa501;
  font-family: 'Courier New', Courier, monospace;
`;

export const WarningNote = ({
  note,
}) => {
  const [pureNote, setPureNote] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Sanitize note
    setPureNote(DOMPurify.sanitize(note));
  }, [note]);

  const toggleOpen = (open) => {
    setIsOpen(open);
    const documentElement = document.body;
    if (open && documentElement) {
      documentElement.style.overflow = 'hidden';
    } else {
      documentElement.style.overflow = 'auto';
    }
  };

  return (
    <WarningContainer>
      <WarningIcon onClick={() => toggleOpen(true)} src={warning} />
      <Modal isOpen={isOpen} close={() => toggleOpen(false)}>
        <WarningBody onClick={(e) => e.stopPropagation()}>
          <Close onClick={() => toggleOpen(false)}>close</Close>
          {pureNote && ReactHtmlParser(pureNote)}
        </WarningBody>
      </Modal>
    </WarningContainer>
  );
};

WarningNote.propTypes = {
  note: PropTypes.string.isRequired,
};
