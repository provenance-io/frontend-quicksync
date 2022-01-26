import styled from 'styled-components';
import backgroundImage from 'img/bg01.jpg';
import { Table } from 'Components';
import { TABLE_HEADERS, BACKUPS_URL } from 'consts';
import { useEffect, useState } from 'react';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding: 50px 100px;
  height: 100vh;
  min-height: 100%;
  width: 100%;
  box-sizing: border-box;
  background: center / cover no-repeat url(${backgroundImage});
`;
const Content = styled.div`
  padding: 50px 100px;
  min-width: 840px;
  border-radius: 6px;
  box-shadow: 1px 1px 6px 0 rgba(0, 0, 0, 0.1);
  background: rgba(255, 255, 255, 0.9);
`;
const SpacedTitle = styled.h1`
  letter-spacing: .5em;
  text-align: center;
`;
const Main = styled.div`
  margin-top: 30px;
`;
const Text = styled.p`
  font-size: 1.3rem;
`;
const Logo = styled.svg`
  margin: auto;
  display: block;
  margin-bottom: 20px;
`;

function App() {
  const [tableData, setTableData] = useState([]);
  const [backupsPulled, setBackupsPulled] = useState(false);
  useEffect(() => {
    if (!backupsPulled) {
      // Only call this once on load
      setBackupsPulled(true);
      // Handle getting data back
      const handleFetchBackups = (request) => {
        const { target } = request;
        const dataString = target.response;
        const data = JSON.parse(dataString);

        if (data && data?.items) {
          const finalData = [];
          // Clean up the data we actually want to use
          data.items.forEach((item) => {
            const { metadata = {} } = item;
            const finalItem = {
              id: item.id,
              download: item.mediaLink,
              checksum: item.md5Hash,
              name: item.name,
              blockHeight: metadata['latest-blockheight'],
              date: metadata['backup-date'],
              version: metadata['provenanced-version'],
              size: item.size,
              network: item.bucket,
              indexed: item.mediaLink.includes('indexed') ? 'Yes' : 'No',
            };
            finalData.push(finalItem);
          });
          const sortedData = finalData.sort((a, b) => (a.date < b.date ? 0 : -1));
          setTableData(sortedData);
        }
      };
      // Create request
      const getBackupsRequest = new XMLHttpRequest();
      getBackupsRequest.addEventListener('load', handleFetchBackups);
      getBackupsRequest.open('GET', BACKUPS_URL);
      getBackupsRequest.send();
    }
  }, [backupsPulled]);

  return (
    <Wrapper>
      <Content>
        <Logo fill="none" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" height="50" width="50">
          <path fill="#3F80F3" d="M17.2 3.5L11.5 0 5.7 3.5 0 7v21.6L5.8 32v-9.9l5.7 3.5 5.8-3.5 5.7-3.5V7l-5.8-3.5zm-5.7 16.3l-5.8-3.5v-5.8L11.5 7l5.7 3.5v5.8l-5.7 3.5z" />
        </Logo>
        <SpacedTitle>PROVENANCE BLOCKCHAIN</SpacedTitle>
        <Main>
          <h1>QuickSync</h1>
          {/* className, headers, data, setActiveIndex, activeIndex */}
          <Table
            headers={TABLE_HEADERS}
            data={tableData}
          />
          <h1>Instructions</h1>
          <Text>
            Visit
            <a href="https://docs.provenance.io" target="_blank" rel="noreferrer"> Provenance.io docs </a>
            for detailed instructions to getting started.
          </Text>
        </Main>
      </Content>
    </Wrapper>
  );
}

export default App;
