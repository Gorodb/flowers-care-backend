import {
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FileElementResponseDto } from './dto/file-element-response.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { MFile } from './mFile.class';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('/upload')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      limits: { fieldSize: 8 * 1024 * 1024, fileSize: 8 * 1024 * 1024 },
    }),
  )
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<FileElementResponseDto> {
    let mFile: MFile;
    try {
      if (file.mimetype.includes('image')) {
        const buffer = await this.filesService.convertToJpg(file.buffer);
        mFile = new MFile({
          originalname: `${file.originalname.split('.')[0]}.jpg`,
          buffer,
        });
      } else {
        mFile = new MFile(file);
      }
    } catch {
      mFile = new MFile(file);
    }
    return this.filesService.saveFiles(mFile);
  }
}
