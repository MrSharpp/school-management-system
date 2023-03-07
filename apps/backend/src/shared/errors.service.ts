import { Injectable } from '@nestjs/common';

// prisma error binding to meaningfull responses
const Errors = new Map<string, { status: number; message: string }>();
Errors.set('P2002', { status: 409, message: 'Field Already Exists' });

@Injectable()
export class ErrorDescriber {
  getErrorDescription(prismaCode: string, fields: string[]) {
    return {
      ...(Errors.get(prismaCode) || {
        status: 500,
        message: 'Unknown Error, Check API',
      }),
      fields,
    };
  }
}
