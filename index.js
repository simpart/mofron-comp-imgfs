/**
 * @file   mofron-comp-{@comp-name}/index.js
 * @author simpart
 */
const mf      = require('mofron');
const FileSel = require('mofron-comp-filesel');
const Image   = require('mofron-comp-image');
const Text    = require('mofron-comp-text');
const Hrzpos  = require('mofron-effect-hrzpos');

/**
 * @class mofron.comp.{@Comp-name}
 * @brief {@comp-name} component for mofron
 */
mf.comp.Imgfs = class extends FileSel {
    
    /**
     * initialize component
     * 
     * @param po paramter or option
     */
    constructor (po) {
        try {
            super();
            this.name('Imgfs');
            this.prmOpt(po);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * initialize dom contents
     * 
     * @param prm : 
     */
    initDomConts (prm) {
        try {
            super.initDomConts();
            this.child([this.image(), this.text()]);
            this.width('100%');
            this.adom().child()[0].style({'height' : '100%'});
            
            let hei_ev = (p1,p2,p3) => {
                try {
                    p3.height(
                        mf.func.sizeSum(p3.image().height(), p3.text().height())
                    );
                } catch (e) {
                    console.error(e.stack);
                    throw e;
                }
            };
            this.image().target().styleListener('height', hei_ev, this); 
            this.text().target().styleListener('height', hei_ev, this);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    image (prm) {
        try {
            if (undefined === prm) {
                /* getter */
                if (undefined === this.m_image) {
                     this.image(
                         new Image({effect : [ new Hrzpos('center') ]})
                     );
                }
                return this.m_image;
            }
            /* setter */
            if (true !== mf.func.isInclude(prm, 'Image')) {
                throw new Error('invalid paramter');
            }
            if (undefined !== this.m_image) {
                this.m_image.execOption(prm.getOption());
            } else {
                this.m_image = prm; 
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    text (prm) {
        try {
            if (undefined === prm) {
                /* getter */
                if (undefined === this.m_text) {
                     this.text(
                         new Text({effect : [ new Hrzpos('center') ]})
                     );
                }
                return this.m_text;
            }
            /* setter */
            if ('string' === typeof prm) {
                this.text().text(prm);
                return;
            } else if (true !== mf.func.isInclude(prm, 'Text')) {
                throw new Error('invalid paramter');
            }
            if (undefined !== this.m_text) {
                this.m_text.execOption(prm.getOption());
            }
            this.m_text = prm;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
module.exports = mf.comp.Imgfs;
/* end of file */
