import { withSessionRoute } from 'lib/withSession';

async function loginRoute(request, response) {
    request.session.user = await request.body;
    request.session.mainUser = await request.body;
    await request.session.save();
    response.send({ ok: true });
}

export default withSessionRoute(loginRoute);
