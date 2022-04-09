import { Components } from './components.enum';
import { RoutingManager, RoutingSchema } from '@app/sharedModules';

const accountRoutingSchema: RoutingSchema<Components> = {
  base: 'account',
  sub: [
    { path: 'login', component: Components.Login },
    { path: 'me', component: Components.GetMe },
    { path: 'register', component: Components.Register },
  ],
};

export const accountRoutingManager = new RoutingManager<Components>(accountRoutingSchema);