export const DirectiveUtils = {

    /**
     * Supprimme la classe dans l'element passé paramètre.
     * @param elementRef
     * @param applyClassesOnSelect
     */
    removeClass: function removeClass(elementRef: any, applyClassesOnSelect: string){
        if (elementRef.nativeElement) {
            for (const key in elementRef.nativeElement.parentNode.children) {
                let element = elementRef.nativeElement.parentNode.children[key];
                if (element.classList) {
                    element.classList.remove(applyClassesOnSelect);
                }
            }
        }
    }


}
