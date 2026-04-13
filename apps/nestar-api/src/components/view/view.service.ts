import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { View } from '../../libs/dto/view/view';
import { ViewInput } from '../../libs/dto/view/view.input';
import { T } from '../../libs/types/command';

@Injectable()
export class ViewService {
  constructor(@InjectModel('View') private readonly viewModule: Model<View>) {}

  public async recordView(input: ViewInput): Promise<View | null> {
    const viewExist = await this.checkViewExistance(input);
    if (!viewExist) {
      console.log('- New View Insert -');
      return await this.viewModule.create(input);
    } else return null;
  }

  private async checkViewExistance(input: ViewInput): Promise<View> {
    const { memberId, viewRefId } = input;
    const search: T = { memberId: memberId, viewRefId: viewRefId };
    return await this.viewModule.findOne(search).exec();
  }
}
