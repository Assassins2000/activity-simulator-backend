import { Components } from './components.enum';
import { RoutingManager, RoutingSchema } from '@app/sharedModules';
import { baseRouterNode } from '../../constants';

const routingSchema: RoutingSchema<Components> = {
  base: baseRouterNode,
  sub: [
    { path: 'createSession', component: Components.CreateSession },
    { path: 'closeSessiom', component: Components.CloseSession },
  ],
};

export const createAndCloseSessionRoutingManager = new RoutingManager<Components>(routingSchema);
