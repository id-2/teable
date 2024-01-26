import { Module } from '@nestjs/common';
import { AccessTokenModule } from './features/access-token/access-token.module';
import { AggregationOpenApiModule } from './features/aggregation/open-api/aggregation-open-api.module';
import { AttachmentsModule } from './features/attachments/attachments.module';
import { AuthModule } from './features/auth/auth.module';
import { AutomationModule } from './features/automation/automation.module';
import { BaseModule } from './features/base/base.module';
import { ChatModule } from './features/chat/chat.module';
import { CollaboratorModule } from './features/collaborator/collaborator.module';
import { FieldOpenApiModule } from './features/field/open-api/field-open-api.module';
import { FileTreeModule } from './features/file-tree/file-tree.module';
import { HealthModule } from './features/health/health.module';
import { InvitationModule } from './features/invitation/invitation.module';
import { NextModule } from './features/next/next.module';
import { NotificationModule } from './features/notification/notification.module';
import { SelectionModule } from './features/selection/selection.module';
import { ShareModule } from './features/share/share.module';
import { SpaceModule } from './features/space/space.module';
import { TableOpenApiModule } from './features/table/open-api/table-open-api.module';
import { UserModule } from './features/user/user.module';
import { GlobalModule } from './global/global.module';
import { InitBootstrapProvider } from './global/init-bootstrap.provider';
import { LoggerModule } from './logger/logger.module';
import { WsModule } from './ws/ws.module';

@Module({
  imports: [
    GlobalModule,
    LoggerModule.register(),
    HealthModule,
    NextModule,
    FileTreeModule,
    TableOpenApiModule,
    FieldOpenApiModule,
    BaseModule,
    ChatModule,
    AttachmentsModule,
    AutomationModule,
    WsModule,
    SelectionModule,
    AggregationOpenApiModule,
    UserModule,
    AuthModule,
    SpaceModule,
    CollaboratorModule,
    InvitationModule,
    ShareModule,
    NotificationModule,
    AccessTokenModule,
  ],
  providers: [InitBootstrapProvider],
})
export class AppModule {}
