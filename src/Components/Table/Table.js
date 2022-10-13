import styled from 'styled-components'
import PropTypes from 'prop-types'
import { satisfies } from 'compare-versions'
import { fileSize } from 'utils'
import { EXPLORER_URL } from 'consts'
import { WarningNote } from 'Components'
import { WARNING_MESSAGES } from 'consts/warningMessages'

const TableContainer = styled.div`
  flex-basis: 100%;
  max-width: 100%;
  overflow-x: auto;
  margin-bottom: 20px;
  border: 1px solid #131620;
  border-radius: 5px;
`
const TableMain = styled.table`
  width: 100%;
  overflow-x: scroll;
  white-space: nowrap;
  border-spacing: 0;
`
const TableHead = styled.thead`
  padding-bottom: 14px;
  text-align: left;
  font-weight: 500;
`
const HeaderText = styled.th`
  font-size: 1.28rem;
  background: #31385f;
  padding: 16px;
  white-space: nowrap;
`
const Row = styled.tr`
  &:nth-child(even) {
    background: #2d2f3f;
  }
`
const TableBody = styled.tbody``
const TableData = styled.td`
  text-align: left;
  padding: 16px;
  vertical-align: middle;
`
const DownloadButton = styled.a`
  background: #498afd;
  padding: 8px 14px;
  border-radius: 5px;
  color: white;
  &:hover {
    background: #2769da;
  }
`

export const Table = ({ className, headers, data: allData, emptyMsg }) => {
  const renderHeaders = () =>
    headers.map(({ display, id }) => (
      <HeaderText key={id}>{display}</HeaderText>
    ))
  const renderBody = () =>
    allData.map(
      ({
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
      }) => {
        // Eventually this will need to be a cleaner/more fancy function
        const checkWarning = () => {
          // if there isn't a version assume it's latest
          if (!version) return false
          // show warning on any version before 1.8.0
          return satisfies(version, '^1.8.0') ? false : 'warning01'
        }
        const useWarning = checkWarning()

        return (
          <Row key={id}>
            <TableData>
              <DownloadButton href={download} download={name}>
                Download
              </DownloadButton>
              {useWarning && (
                <WarningNote note={WARNING_MESSAGES[useWarning]} />
              )}
            </TableData>
            <TableData>{network}</TableData>
            <TableData>{checksum}</TableData>
            <TableData>{fileSize(size)}</TableData>
            <TableData>{date}</TableData>
            <TableData>
              <a
                href={`${EXPLORER_URL}/block/${blockHeight}`}
                target="_blank"
                rel="noreferrer"
              >
                {blockHeight}
              </a>
            </TableData>
            <TableData>{version}</TableData>
            <TableData>{indexed}</TableData>
          </Row>
        )
      }
    )

  return (
    <TableContainer className={className}>
      <TableMain>
        <TableHead>
          <Row>{renderHeaders()}</Row>
        </TableHead>
        <TableBody>
          {allData.length ? (
            renderBody()
          ) : (
            <tr>
              <td colSpan="100">{emptyMsg}</td>
            </tr>
          )}
        </TableBody>
      </TableMain>
    </TableContainer>
  )
}

Table.propTypes = {
  className: PropTypes.string,
  headers: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  emptyMsg: PropTypes.string,
}
Table.defaultProps = {
  className: '',
  emptyMsg: 'No results...',
}
