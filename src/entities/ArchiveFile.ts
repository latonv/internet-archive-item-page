
/**
 * Expected raw data shape of an item's file metadata
 */
export type ArchiveFileData = {
  name: string,
  source: FileSource,
  format: string,
  size: string,
  [key: string]: unknown
};

type FileSource = 'original' | 'derivative' | 'metadata';

/**
 * Data object representing metadata about a file attachment for an Internet Archive item.
 */
export class ArchiveFile {
  
  /**
   * The file name (incl. extension). May be a file path.
   */
  public readonly name: string;

  /**
   * The source of the file (user-uploaded original or archive-generated derivative/metadata)
   */
  public readonly source: FileSource;

  /**
   * A string representing the file format.
   */
  public readonly format: string;

  /**
   * The file's size in bytes.
   */
  public readonly size: number;

  constructor(data: ArchiveFileData) {
    if ('name' in data) {
      this.name = data.name;
    }

    if ('source' in data) {
      this.source = data.source;
    }

    if ('format' in data) {
      this.format = data.format;
    }

    if ('size' in data) {
      this.size = Number(data.size);
    }
  }

}