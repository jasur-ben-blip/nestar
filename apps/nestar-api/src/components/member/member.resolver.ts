import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MemberService } from './member.service';
import { LoginInput, MemberInput } from '../../libs/dto/member/member.input';
import { Member } from '../../libs/dto/member/member';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/guards/auth.guard';
import { AuthMember } from '../auth/decorators/authMember.decorator';
import * as mongoose from 'mongoose';
import { Roles } from '../auth/decorators/roles.decorator';
import { MemberType } from '../../libs/enums/member.enum';
import { RolesGuard } from '../auth/guards/roles.guard';
import { MemberUpdate } from '../../libs/dto/member/member.update';
import { shapeIntoMongoObjectId } from '../../libs/config';

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

  //// TEST ////

  @UseGuards(AuthGuard)
  @Query(() => String)
  public async checkAuth(
    @AuthMember('memberNick') memberNick: string,
  ): Promise<string> {
    console.log('Query: memberNick');
    console.log('memberNick:', memberNick);
    return `HI ${memberNick}`;
  }

  @Roles(MemberType.USER, MemberType.AGENT)
  @UseGuards(RolesGuard)
  @Query(() => String)
  public async checkAuthRoles(
    @AuthMember() authMember: Member,
  ): Promise<string> {
    console.log('Query: checkAuthRoles');
    return `HI ${authMember.memberNick}, you are ${authMember.memberType} memberId: ${authMember._id}`;
  }

  ////

  @UseGuards(AuthGuard) // Authenticated
  @Mutation(() => Member)
  public async updateMember(
    @Args('input') input: MemberUpdate,
    @AuthMember('_id') memberId: mongoose.ObjectId,
  ): Promise<Member> {
    console.log('MUTATION: updateMember');
    delete input._id;
    return await this.memberService.updateMember(memberId, input);
  }

  @Query(() => Member)
  public async getMember(@Args('memberId') input: string): Promise<Member> {
    console.log('Query: getMember');
    const targetId = shapeIntoMongoObjectId(input);
    return await this.memberService.getMember(targetId);
  }

  /** ADMIN **/

  @Roles(MemberType.ADMIN)
  @UseGuards(RolesGuard)
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
