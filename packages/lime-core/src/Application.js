/*
 * Copyright (c) 2014 - Copyright holders CIRSFID and Department of
 * Computer Science and Engineering of the University of Bologna
 * 
 * Authors: 
 * Monica Palmirani – CIRSFID of the University of Bologna
 * Fabio Vitali – Department of Computer Science and Engineering of the University of Bologna
 * Luca Cervone – CIRSFID of the University of Bologna
 * 
 * Permission is hereby granted to any person obtaining a copy of this
 * software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 * 
 * The Software can be used by anyone for purposes without commercial gain,
 * including scientific, individual, and charity purposes. If it is used
 * for purposes having commercial gains, an agreement with the copyright
 * holders is required. The above copyright notice and this permission
 * notice shall be included in all copies or substantial portions of the
 * Software.
 * 
 * Except as contained in this notice, the name(s) of the above copyright
 * holders and authors shall not be used in advertising or otherwise to
 * promote the sale, use or other dealings in this Software without prior
 * written authorization.
 * 
 * The end-user documentation included with the redistribution, if any,
 * must include the following acknowledgment: "This product includes
 * software developed by University of Bologna (CIRSFID and Department of
 * Computer Science and Engineering) and its authors (Monica Palmirani, 
 * Fabio Vitali, Luca Cervone)", in the same place and form as other
 * third-party acknowledgments. Alternatively, this acknowledgment may
 * appear in the software itself, in the same form and location as other
 * such third-party acknowledgments.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
 * CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
 * TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */


// Todo: remove Locale and Config references in files all around
console.log('loaded')
Ext.syncRequire(['LIME.Locale', 'LIME.Config']);
Ext.define('LIME.Application', {
    name: 'LIME',

    extend: 'Ext.app.Application',

    requires: [
        // Singletons
        'LIME.Utilities',
        'LIME.Statics',
        'LIME.DocProperties',
        'LIME.DomUtils',
        'LIME.Server',
        'LIME.User',
        'LIME.Interpreters',

        'LIME.view.Viewport',
        
        'LIME.controller.CustomizationManager',
        'LIME.controller.DocumentUploader', 
        'LIME.controller.LoginManager', 
        'LIME.controller.MainToolbar', 
        'LIME.controller.Storage', 
        'LIME.controller.Editor', 
        'LIME.controller.MarkingMenu', 
        'LIME.controller.Marker', 
        'LIME.controller.Outliner', 
        'LIME.controller.Language', 
        'LIME.controller.ProgressWindow',
        'LIME.controller.Notification',
        'LIME.controller.ContextMenu',
        'LIME.controller.ContextInfoManager',
        'LIME.controller.WidgetManager',
        
        'LIME.store.Outliner', 
        'LIME.store.Languages',
        'LIME.store.OpenFile',
        'LIME.store.LanguagesPlugin',
        'LIME.store.Locales',
        'LIME.store.Nationalities', 
        'LIME.store.DocumentTypes',
        'LIME.store.DocumentLanguages',
        'LIME.store.MarkupLanguages',
        'LIME.store.OpenedDocuments'
    ],

    controllers: [
        'CustomizationManager',
        'DocumentUploader', 
        'LoginManager', 
        'MainToolbar',
        'Storage', 
        'Editor', 
        'MarkingMenu', 
        'Marker', 
        'Outliner', 
        'Language', 
        'ProgressWindow',
        'Notification',
        'ContextMenu',
        'ContextInfoManager',
        'WidgetManager'
    ],

    stores: [
        'Outliner', 
        'Languages',
        'OpenFile',
        'LanguagesPlugin',
        'Locales',
        'Nationalities', 
        'DocumentTypes',
        'DocumentLanguages',
        'MarkupLanguages',
        'OpenedDocuments'
    ],
    
    launch : function() {
        // Calling the secure launch that launches the app only if all files are loaded
        this.secureLaunch();
    },
    
    /**
     * This function loads the MarkupLanguages store and creates
     * the application viewport when the configuration is finished
     * */
    secureLaunch: function() {
        if (!Config.loadedFinish) {
            Ext.defer(this.secureLaunch, 100, this);
        } else {
            this.getStore('MarkupLanguages').loadData(Config.languages);
            console.info('LIME.view.Viewport')
            Ext.create('LIME.view.Viewport');
        }
    }
});