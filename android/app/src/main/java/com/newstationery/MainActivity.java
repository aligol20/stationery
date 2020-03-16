package com.newstationery;

import android.widget.LinearLayout;

import com.reactnativenavigation.controllers.SplashActivity;

public class MainActivity extends SplashActivity {
    @Override
    public LinearLayout createSplashLayout() {
        setContentView(R.layout.splash);
        LinearLayout view = findViewById(R.id.anan);

        /**
         * Returns the name of the main component registered from JavaScript.
         * This is used to schedule rendering of the component.
         */
        return view;
    }

}
