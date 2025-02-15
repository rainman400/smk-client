include.module( 'tool-measure', [ 'tool', 'widgets', 'sidepanel', 'tool-measure.panel-measure-html' ], function ( inc ) {
    "use strict";

    Vue.component( 'measure-widget', {
        extends: inc.widgets.toolButton,
    } )

    Vue.component( 'measure-panel', {
        extends: inc.widgets.toolPanel,
        template: inc[ 'tool-measure.panel-measure-html' ],
        props: [ 'results', 'viewer' ],
        data: function () {
            return {
                unit: 'metric'
            }
        },
        computed: {
            dimensionalNumber: {
                get: function () {
                    return Vue.filter( 'dimensionalNumber' )
                }
            }
        }
    } )

    Vue.directive( 'container', {
        unbind: function ( el, binding, vnode ) {
            // console.log( 'unbind', arguments )
            vnode.context.$$emit( 'container-unbind', { el: el } )
        },

        inserted: function ( el, binding, vnode ) {
            vnode.context.$$emit( 'container-inserted', { el: el } )
            // console.log( 'inserted', arguments )
        },

        update: function ( el, binding ) {
            // console.log( 'update', arguments )
        }
    } )
    // _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
    //
    function MeasureTool( option ) {
        this.makePropWidget( 'icon' )//, 'straighten' )

        this.makePropPanel( 'results', [] )
        this.makePropPanel( 'viewer', {} )

        SMK.TYPE.PanelTool.prototype.constructor.call( this, $.extend( {
            // order:          6,
            // position:       'menu',
            // title:          'Measurement',
            widgetComponent:'measure-widget',
            panelComponent: 'measure-panel',
        }, option ) )
    }

    SMK.TYPE.MeasureTool = MeasureTool

    $.extend( MeasureTool.prototype, SMK.TYPE.PanelTool.prototype )
    MeasureTool.prototype.afterInitialize = []
    // _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
    //
    MeasureTool.prototype.afterInitialize.push( function ( smk ) {
        var self = this

        smk.on( this.id, {
            'activate': function () {
                if ( !self.enabled ) return

                self.active = !self.active
            },
        } )
    } )

    return MeasureTool
} )

