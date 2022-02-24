import styled from 'styled-components';
import backgroundImage from 'img/header-bg.webp';
import { Table } from 'Components';
import { TABLE_HEADERS, BACKUPS_URL, DOCS_URL } from 'consts';
import { useEffect, useState } from 'react';

const Wrapper = styled.div`
  background: top / contain no-repeat url(${backgroundImage}) #131620;
  font-size: 1.3rem;
  @media (max-width: 600px) {
    background: top / cover no-repeat url(${backgroundImage}) #131620;
  }
`;
const Content = styled.div`
  padding: 160px 50px 120px 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  @media (max-width: 600px) {
    padding: 50px 20px;
  }
`;
const Text = styled.p`
  font-size: 1.3rem;
`;
const LogoSVG = styled.svg`
  margin: auto;
  display: block;
  margin-bottom: 32px;
`;
const LogoText = styled.h1`
  letter-spacing: .5em;
  color: white;
  font-weight: 700;
  font-size: 2.8rem;
  text-align: center;
  margin-bottom: 40px;
`;
const TopSection = styled.section`
  margin-bottom: 100px;
`;
const SectionBorder = styled.section`
  margin-bottom: 40px;
  padding: 1px;
  max-width: 1200px;
  width: 100%;
  border-radius: 9px;
  box-sizing: content-box;
  background-image:
    linear-gradient(
      168deg,
      #245efe -29%,
      rgba(33,20,20,0.54) 31%,
      hsla(0,0%,100%,0)
    ),
    linear-gradient(
      328deg,
      rgba(15,15,15,0.5) -18%,
      hsla(0,0%,100%,0) 19%
    );
`;
const Section = styled.div`
  padding: 45px;
  border-radius: 9px;
  box-shadow: 1px 1px 6px 0 rgba(0, 0, 0, 0.1);
  background-color: #191c27;
  max-width: 100%;
  text-align: left;
  h1 {
    margin-top: 0;
  }
`;
const Warning = styled.h3`
  color: #f3d66b;
  background: #404027;
  padding: 12px;
  border-radius: 4px;
  margin-bottom: 24px;
`;
const Bold = styled.p`
  color: #ffc800;
  font-weight: bold;
  margin-bottom: 10px;
`;
const Code = styled.span`
  background: #191b28;
  padding: 2px 6px;
  border-radius: 3px;
  color: #ffa501;
  font-family: 'Courier New', Courier, monospace;
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
              network: metadata['chain-id'],
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
        <TopSection>
          <LogoSVG fill="none" viewBox="0 0 22 32" xmlns="http://www.w3.org/2000/svg" height="42" width="30">
            <path fill="#FFFFFF" d="M17.2 3.5L11.5 0 5.7 3.5 0 7v21.6L5.8 32v-9.9l5.7 3.5 5.8-3.5 5.7-3.5V7l-5.8-3.5zm-5.7 16.3l-5.8-3.5v-5.8L11.5 7l5.7 3.5v5.8l-5.7 3.5z" />
          </LogoSVG>
          <LogoText>PROVENANCE BLOCKCHAIN</LogoText>
          <h1>QuickSync</h1>
        </TopSection>
        <SectionBorder>
          <Section>
            <Warning>
              <Bold>Note on 1.8.x cpu compatibility:</Bold>
              <Code>wasm cache</Code> was included in the quicksync files for certain cpu specific features. When extracted, these would cause various issues.  The simple, temporary solution is to remove the contents of <Code>/provenanced/data/wasm/wasm/cache</Code> when starting a node using an existing quicksync copy.  For additional information, see <a href="https://github.com/wasmerio/wasmer/issues/2781" target="_blank" rel="noreferrer">https://github.com/wasmerio/wasmer/issues/2781</a>.
            </Warning>
            <h1>Downloads</h1>
            <Table
              headers={TABLE_HEADERS}
              data={tableData}
            />
          </Section>
        </SectionBorder>
        <SectionBorder>
          <Section>
            <h1>Instructions</h1>
            <Text>
              Visit
              <a href={DOCS_URL} target="_blank" rel="noreferrer"> Provenance.io docs </a>
              for detailed instructions on getting started.
            </Text>
          </Section>
        </SectionBorder>
      </Content>
    </Wrapper>
  );
}

export default App;
