import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { renderToString } from 'react-dom/server';
import { Routes, Route, Link } from 'react-router-dom';
import { StaticRouter } from 'react-router-dom/server';

const HomePage = () => {
  return (
    <div>
      home page
      <Link to={'broken'}>Not found</Link>
    </div>
  );
};

const PersonalPage = () => {
  return <div>personal page</div>;
};

const NotFoundPage = () => {
  return <div>not found page</div>;
};

// const routes = [
//   {
//     path: '/',
//     component: '/'
//   }
// ]

// TODO: Fastrefresh для dev-сборки
// TODO: Клиентская сборка
// TODO: сплитинг бандлов (каждый роут должен быть dynamic)
// TODO: Линки должны быть с href, а не to

// TODO: Надо сделать кастомный AuthRoute, который будет проверять из контекста условие флагов или авторизации
// тогда мы и на клиенте и на сервере будем в одном месте хранить эту логику.
const Application = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/personal" element={<PersonalPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

@Injectable()
export class RenderService {
  appRender(request: Request): string {
    return renderToString(
      <StaticRouter location={request.url}>
        <Application />
      </StaticRouter>,
    );
  }
}
