import './index.scss';
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import React from "react";
import { Route } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import migrate from 'modules/migrations.js';
import Main from 'ui/screens/main';
import Settings from "ui/screens/settings";

await migrate();

setupIonicReact({mode: 'ios'});

createRoot(document.querySelector('#root')).render(
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/" exact={true}>
          <Main/>
        </Route>

        <Route path="/settings" exact={true}>
          <Settings/>
        </Route>


      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);
