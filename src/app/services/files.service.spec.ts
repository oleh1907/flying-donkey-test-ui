import { FilesService } from './files.service';
import { FileInstance } from '../models/file-instance.model';

describe('FilesService', () => {
  let service: FilesService;

  beforeEach(() => {
    service = new FilesService();
  });

  it('#getFiles length should be greater than zero', () => {
    const files: FileInstance[] = [
      new FileInstance(1, 'File1', 1, new Date(), 'User1'),
      new FileInstance(2, 'File2', 2, new Date(), 'User2'),
      new FileInstance(3, 'File3', 3, new Date(), 'User3'),
    ];
    service.setFiles(files);
    expect(service.getFiles().length).toBeGreaterThan(0);
  });
  it('#getFiles length should NOT be greater than zero', () => {
    const files: FileInstance[] = [];
    service.setFiles(files);
    expect(service.getFiles().length).not.toBeGreaterThan(0);
  });

  it('#getExtensions length should be greater than zero', () => {
    const extensions: string[] = ['.txt', '.docx', '.pdf'];

    service.setExtensions(extensions);
    expect(service.getExtensions().length).toBeGreaterThan(0);
  });
  it('#getExtensions length should NOT be greater than zero', () => {
    const extensions: string[] = [];
    service.setExtensions(extensions);

    expect(service.getExtensions().length).not.toBeGreaterThan(0);
  });
});
