import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MemberService } from './member.service';
import { LoginInput, MemberInput } from '../../libs/dto/member/member.input';
import { Member } from '../../libs/dto/member/member';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/guards/auth.guard';
import { AuthMember } from '../auth/decorators/authMember.decorator';
import * as mongoose from 'mongoose';

@Resolver()
export class MemberResolver {
  constructor(private readonly memberService: MemberService) {}

  @Mutation(() => Member)
  public async signup(@Args('input') input: MemberInput): Promise<Member> {
    console.log('MUTATION: signup');
    return await this.memberService.signup(input);
  }

  @Mutation(() => Member)
  public async login(@Args('input') input: LoginInput): Promise<Member> {
    console.log('MUTATION: login');
    return await this.memberService.login(input);
  }

  @UseGuards(AuthGuard) // Authenticated
  @Mutation(() => String)
  public async updateMember(
    @AuthMember('_id') memberId: mongoose.ObjectId,
  ): Promise<string> {
    console.log('MUTATION: updateMember');
    console.log(memberId);
    return await this.memberService.updateMember();
  }

  ////

  @UseGuards(AuthGuard) // Authenticated
  @Query(() => String)
  public async checkAuth(
    @AuthMember('memberNick') memberNick: string,
  ): Promise<string> {
    console.log('Query: memberNick');
    console.log('memberNick:', memberNick);
    return `HI ${memberNick}`;
  }

  ////

  @Query(() => String)
  public async getMember(): Promise<string> {
    console.log('Query: getMember');
    return await this.memberService.getMember();
  }

  /** ADMIN **/

  // auth admin
  @Mutation(() => String)
  public async getAllMembersByAdmin(): Promise<string> {
    return this.memberService.getAllMembersByAdmin();
  }

  @Mutation(() => String)
  public async updateMemberByAdmin(): Promise<string> {
    console.log('Mutation: updateMemberByAdmin');
    return this.memberService.updateMemberByAdmin();
  }
}
