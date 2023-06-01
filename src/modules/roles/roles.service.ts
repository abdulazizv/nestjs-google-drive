import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PrismaService } from '../../shared/prisma/prisma.service';

@Injectable()
export class RolesService {
  constructor(private prismaService: PrismaService) {}

  async create(createRoleDto: CreateRoleDto) {
    const newRole = await this.prismaService.roles.create({
      data: { ...createRoleDto },
    });
    return newRole;
  }

  async findAll() {
    const allRoles = await this.prismaService.roles.findMany();
    return allRoles;
  }

  async findOne(id: string) {
    const role = await this.prismaService.roles.findUnique({
      where: { id },
    });
    if (!role) {
      throw new NotFoundException('Role not found');
    }
    return role;
  }

  async update(id: string, updateRoleDto: UpdateRoleDto) {
    const updatedRole = await this.prismaService.roles.update({
      where: { id },
      data: { ...updateRoleDto },
    });
    return updatedRole;
  }

  async remove(id: string) {
    const deletedRole = await this.prismaService.roles.delete({
      where: { id },
    });
    if (!deletedRole) {
      throw new NotFoundException('Role not found');
    }
    return {
      status: 'OK',
      message: 'Deleted successfully',
    };
  }
}
