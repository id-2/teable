import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { SpaceRole } from '@teable-group/core';
import { Copy, X } from '@teable-group/icons';
import {
  deleteSpaceInvitationLink,
  listSpaceInvitationLink,
  updateSpaceInvitationLink,
} from '@teable-group/openapi';
import { useSpaceRoleStatic } from '@teable-group/sdk/hooks';
import {
  Button,
  Input,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  useToast,
} from '@teable-group/ui-lib';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { map } from 'lodash';
import { useMemo } from 'react';
import { RoleSelect } from './RoleSelect';
import { getRolesWithLowerPermissions } from './utils';
dayjs.extend(relativeTime);

interface IInviteLink {
  spaceId: string;
  role: SpaceRole;
}

export const InviteLink: React.FC<IInviteLink> = (props) => {
  const { spaceId, role } = props;
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const linkList = useQuery({
    queryKey: ['invite-link-list', spaceId],
    queryFn: ({ queryKey }) => listSpaceInvitationLink(queryKey[1]),
  }).data?.data;

  const { mutate: updateInviteLink, isLoading: updateInviteLinkLoading } = useMutation({
    mutationFn: updateSpaceInvitationLink,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invite-link-list'] });
    },
  });

  const { mutate: deleteInviteLink, isLoading: deleteInviteLinkLoading } = useMutation({
    mutationFn: deleteSpaceInvitationLink,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invite-link-list'] });
    },
  });

  const copyInviteUrl = async (url: string) => {
    await navigator.clipboard.writeText(url);
    toast({ title: 'Link copied' });
  };

  const spaceRoleStatic = useSpaceRoleStatic();
  const filterRoles = useMemo(
    () => map(getRolesWithLowerPermissions(role, spaceRoleStatic), 'role'),
    [role, spaceRoleStatic]
  );

  if (!linkList?.length) {
    return <></>;
  }

  return (
    <div>
      <div className="mb-3 text-sm text-muted-foreground">Invite links</div>
      <div className="space-y-3">
        {linkList.map(({ invitationId, inviteUrl, createdTime, role }) => (
          <div key={invitationId} className="relative flex items-center gap-3 pr-7">
            <div className="flex flex-1 items-center gap-2">
              <Input className="h-8 flex-1" value={inviteUrl} readOnly />
              <Copy
                onClick={() => copyInviteUrl(inviteUrl)}
                className="size-4 cursor-pointer text-muted-foreground opacity-70 hover:opacity-100"
              />
            </div>
            <div className="text-xs text-muted-foreground">
              created {dayjs(createdTime).fromNow()}
            </div>
            <RoleSelect
              value={role}
              disabled={updateInviteLinkLoading}
              filterRoles={filterRoles}
              onChange={(role) =>
                updateInviteLink({ spaceId, invitationId, updateSpaceInvitationLinkRo: { role } })
              }
            />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    className="absolute right-0 h-auto p-0 hover:bg-inherit"
                    size="sm"
                    variant="ghost"
                    disabled={deleteInviteLinkLoading}
                    onClick={() => deleteInviteLink({ spaceId, invitationId })}
                  >
                    <X className="size-4 cursor-pointer text-muted-foreground opacity-70 hover:opacity-100" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Remove link</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        ))}
      </div>
    </div>
  );
};
