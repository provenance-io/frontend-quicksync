import styled from 'styled-components';
import PropTypes from 'prop-types';
import { fileSize } from 'utils';
import { EXPLORER_URL } from 'consts';

const TableContainer = styled.div`
  flex-basis: 100%;
  max-width: 100%;
  overflow-x: auto;
  margin-bottom: 20px;
  border: 1px solid #e9effd;
  border-radius: 10px;
`;
const TableMain = styled.table`
  width: 100%;
  overflow-x: auto;
  white-space: nowrap;
  border-spacing: 0;
`;
const TableHead = styled.thead`
  padding-bottom: 14px;
  text-align: left;
  font-weight: 500;
  box-shadow: -1px 0 1px 1px #ededed;
  background: #e9effd;
`;
const HeaderText = styled.th`
  font-size: 1.28rem;
  padding: 10px 20px;
  white-space: nowrap;
  ${({ clickable }) => clickable && 'cursor: pointer;'}
`;
const Row = styled.tr`
  border-bottom: 1px solid #777777;
  &:nth-child(even) {
    background: #f2f6ff;
  }
`;
const TableBody = styled.tbody``;
const TableData = styled.td`
  text-align: left;
  padding: 10px 20px;
  min-width: ${({ small }) => !small && '100px'};
  padding: '10px 20px';
  vertical-align: middle;
`;
const DownloadButton = styled.a`
  background: #498afd;
  padding: 6px 10px;
  border-radius: 5px;
  color: white;
  &:hover {
    background: #2769da;
  }
`;

export const Table = ({
  className, headers, data: allData, emptyMsg,
}) => {
  const renderHeaders = () => headers.map(({ display, id }) => (
    <HeaderText key={id}>
      {display}
    </HeaderText>
  ));
  const renderBody = () => (
    allData.map(({
      download,
      network,
      id,
      checksum,
      size,
      date,
      name,
      version,
      blockHeight,
      indexed,
    }) => (
      <Row key={id}>
        <TableData small>
          <DownloadButton href={download} download={name}>Download</DownloadButton>
        </TableData>
        <TableData>{network}</TableData>
        <TableData>{checksum}</TableData>
        <TableData small>{fileSize(size)}</TableData>
        <TableData small>{date}</TableData>
        <TableData small>
          <a href={`${EXPLORER_URL}/block/${blockHeight}`} target="_blank" rel="noreferrer">
            {blockHeight}
          </a>
        </TableData>
        <TableData small>{version}</TableData>
        <TableData small>{indexed}</TableData>
      </Row>
    ))
  );

  return (
    <TableContainer className={className}>
      <TableMain>
        <TableHead>
          <Row>
            {renderHeaders()}
          </Row>
        </TableHead>
        <TableBody>
          {allData.length ? renderBody() : <tr><td colSpan="100">{emptyMsg}</td></tr>}
        </TableBody>
      </TableMain>
    </TableContainer>
  );
};

Table.propTypes = {
  className: PropTypes.string,
  headers: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  emptyMsg: PropTypes.string,
};
Table.defaultProps = {
  className: '',
  emptyMsg: 'No results...',
};
