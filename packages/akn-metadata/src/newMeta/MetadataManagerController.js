/*
 * Copyright (c) 2016 - Copyright holders CIRSFID and Department of
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

Ext.define('AknMetadata.newMeta.MetadataManagerController', {
    extend: 'Ext.app.Controller',
    requires: ['AknMetadata.newMeta.Editor'],

    refs : [
        { ref: 'toolbar', selector: 'main tabbar'}
    ],

    init: function() {
        this.application.on(Statics.eventsNames.afterLoad, this.addMetadataButton, this);

        var cmp = Ext.create(AknMetadata.newMeta.Editor, {
            name: 'metaManagerPanel',
            itemId: 'metaManagerPanel',
            autoDestroy: false,
            groupName: 'akn-metadata'
        });


        var me = this;
        this.control({
            '[itemId=metaManagerPanel]': {
                render: function(cmp) {
                    cmp.up('tabpanel').tabBar.hide()
                }
            },
            'contextPanel': {
                show: function(cmp) {
                    if (cmp.down('[name=akn-metadata]') && cmp.down('[name=akn-metadata]').isVisible())
                        me.toggleMetadataButton(true);
                },
                hide: function(cmp) {
                    me.toggleMetadataButton(false);
                }
            }
        });

        this.application.fireEvent(Statics.eventsNames.addContextPanelTab, cmp);
        return cmp;
    },

    addMetadataButton: function () {
        var me = this, toolbar = me.getToolbar();
        if (!toolbar.down("[cls='editorTabButton openMetadataBtn']")) {
            toolbar.add({xtype: 'tbfill'});
            toolbar.add({
                xtype: 'button',
                enableToggle: true,
                cls : 'editorTabButton openMetadataBtn',
                margin : '0 10 0 0',
                text : Locale.getString('title', 'akn-metadata'),
                listeners : {
                    click : function (btn) {
                        me.toggleMetadataEditor(btn.pressed);
                    }
                }
            });
        }
    },

    toggleMetadataEditor: function(open) {
        this.application.fireEvent(Statics.eventsNames.openCloseContextPanel, open, 'akn-metadata', 300);
    },

    toggleMetadataButton: function(state) {
        var btn = this.getToolbar().down("[cls='editorTabButton openMetadataBtn']");
        if (btn)
            btn.toggle(state);
    }
});
