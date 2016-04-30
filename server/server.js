import Express from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';
import config from '../configs/config';
import favicon from 'serve-favicon';
import compression from 'compression';
import path from 'path';
import Html from '../shared/helpers/Html';
import PrettyError from 'pretty-error';
import http from 'http';
import { Provider } from 'react-redux';
import createHistory from 'react-router/lib/createMemoryHistory';
import { match, RouterContext } from 'react-router';
import fillStore from '../shared/helpers/fill-store';
import getRoutes from '../shared/routes';
import getStatusFromRoutes from '../shared/helpers/getStatusFromRoutes';
import configureStore from '../shared/store';

const pretty = new PrettyError();
const app = new Express();
const server = new http.Server(app);

app.use(compression());
app.use(favicon(path.join(__dirname, '..', 'static', 'favicon.ico')));

app.use(Express.static(path.join(__dirname, '..', 'static')));

app.use((req, res) => {
    const history = createHistory(req.originalUrl);
    const store = configureStore(history);
    if (__DEVELOPMENT__) {
        // Do not cache webpack stats: the script file would change since
        // hot module replacement is enabled in the development env
        webpackIsomorphicTools.refresh();
    }

    function hydrateOnClient() {
        res.send('<!doctype html>\n' +
        ReactDOM.renderToString(<Html assets={webpackIsomorphicTools.assets()} store={store}/>));
    }

    if (__DISABLE_SSR__) {
        console.log("ssrFalse");
        hydrateOnClient();
        return;
    }

    match({ routes: getRoutes(store), location: req.originalUrl }, (error, redirectLocation, renderProps) => {

        if (redirectLocation) {
            res.redirect(redirectLocation.pathname + redirectLocation.search);
        } else if (error) {
            console.error('ROUTER ERROR:', pretty.render(error));
            res.status(500);
            hydrateOnClient();
        }else if (renderProps) {
            /* fill store with data from to-be-rendered components */
            // fillStore(store, renderProps.components,renderProps.params)
                // .then(() => {
                    // loadOnServer({...renderProps, store}).then(() => {
                      const component = (
                        <Provider store={store} key="provider">
                          <RouterContext {...renderProps}/>
                        </Provider>
                      );
                      // const status = getStatusFromRoutes(renderProps.routes);
                      // console.log("sf"+status);
                      // if (status) {
                      //   res.status(status);
                      // }

                      // console.log(renderProps.routes);
                      // res.status(200);

                      global.navigator = {userAgent: req.headers['user-agent']};

                      res.send('<!doctype html>\n' + ReactDOM.renderToString(<Html assets={webpackIsomorphicTools.assets()} component={component} store={store}/>));
                    // });
                // })
                // .catch(e => {
                //     console.trace(e);
                //     res.status(500);
                //     hydrateOnClient();
                // })
        } else {
          res.status(404).send('Not found');
        }
    });
});

if (config.port) {
  server.listen(config.port, (err) => {
    if (err) {
      console.error(err);
    }
    console.info('----\n==> ✅  %s is running', config.app.title);
    console.info('==> 💻  Open http://%s:%s in a browser to view the app.', config.host, config.port);
  });
} else {
  console.error('==>     ERROR: No PORT environment variable has been specified');
}
