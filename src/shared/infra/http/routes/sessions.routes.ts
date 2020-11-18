import { Router } from 'express';
import UserMap from '../map/UserMap';
import AuthenticateUserService from '../service/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {

  const { email, password } = request.body;

  const authenticateUserService = new AuthenticateUserService();

  const { user, token } = await authenticateUserService.execute({
    email,
    password,
  });

  const userDTO = UserMap.toDTO(user);

  return response.json({ userDTO, token });

});

export default sessionsRouter;
