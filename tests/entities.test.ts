import { expect } from 'chai';
import * as fs from 'fs/promises';
import * as path from 'path';
import { ArchiveItem, ArchiveItemData } from '../src/entities/ArchiveItem';
import { MediaType } from '../src/entities/MediaType';

//
// Just some quick unit tests to ensure ArchiveItem/ArchiveFile constructors are correctly 
// parsing metadata derived from the API.
//

const DATA_DIR = path.resolve(__dirname, './data');

const exampleDataFiles = [
  'audio-example-data.json',
  'movies-example-data.json',
  'texts-example-data.json'
];
const exampleOutputFiles = [
  'texts-example-output.txt'
];

let exampleData;
let audioExampleData: ArchiveItemData;
let moviesExampleData: ArchiveItemData;
let textsExampleData: ArchiveItemData;
let textsExampleOutput: string;

// Set up the example data prior to running the tests
before(async () => {
  // Inflate each example file into an object
  const fileContents = await Promise.all(exampleDataFiles.map(file => {
    return fs.readFile(path.join(DATA_DIR, file), { encoding: 'utf8' });
  }));

  exampleData = fileContents.map(data => JSON.parse(data));
  [audioExampleData, moviesExampleData, textsExampleData] = exampleData;

  const outputFileContents = await Promise.all(exampleOutputFiles.map(file => {
    return fs.readFile(path.join(DATA_DIR, file), { encoding: 'utf8' });
  }));

  [textsExampleOutput] = outputFileContents;
});

//
// Tests
//
describe('Parsing metadata JSON into ArchiveItem objects', () => {

  // Movies (InformationM)
  it('correctly parses InformationM metadata (movies)', () => {
    const item = new ArchiveItem(moviesExampleData);
    expect(item).to.be.an.instanceOf(ArchiveItem);
    expect(item).to.include({
      identifier: 'InformationM',
      title: 'Information Machine, The',
      description: 'Applies graphic sensitivity to medium in cartoon form, and traces the history of storing'
        + ' and analyzing information from the days of the cavemen to today\'s age of electronic brains.',
      mediaType: MediaType.MOVIES,
      licenseURL: 'http://creativecommons.org/licenses/publicdomain/'
    });
  });

  // Texts (MoonlightSonata_606)
  it('correctly parses MoonlightSonata_606 metadata (texts)', () => {
    const item = new ArchiveItem(textsExampleData);
    expect(item).to.be.an.instanceOf(ArchiveItem);
    expect(item).to.include({
      identifier: 'MoonlightSonata_606',
      title: 'Moonlight Sonata',
      creator: 'LV Beethoven',
      description: `Piano Sonata No.14, Op.27/2 (Moonlight), LV Beethoven\nPublic domain sheet music.\nFrom http://cantorion.org`,
      mediaType: MediaType.TEXTS
    });
  });

  // Audio (relativity_librivox)
  it('correctly parses relativity_librivox metadata (audio)', () => {
    const item = new ArchiveItem(audioExampleData);
    expect(item).to.be.an.instanceOf(ArchiveItem);
    expect(item).to.include({
      identifier: 'relativity_librivox',
      title: 'Relativity: The Special and General Theory',
      creator: 'Albert Einstein',
      mediaType: MediaType.AUDIO
    });
    expect(item.description).to.be.a('string').and.to.satisfy((desc: string) => desc.startsWith(
      '<a href="http://librivox.org/" rel="nofollow">Librivox</a> recording of Relativity by Albert Einstein (translated by Robert W. Lawson)\n\n'
    ));
  });

  // Round-trip toString on texts (MoonlightSonata_606)
  it('correctly saves and reproduces all custom metadata when converted to a string', () => {
    const item = new ArchiveItem(textsExampleData);
    expect(item.toString()).to.equal(textsExampleOutput);
  });

});