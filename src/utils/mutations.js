import { useMutation as apolloUseMutation } from '@vue/apollo-composable';
import { useToast } from 'vue-toastification';
import { merge } from 'lodash';

const defaultMutationOptions = {
    trigger: null, // Ref<Boolean> once onDone or onError is ran, this should be set to false (if it's set)
    onDone: null, // String or function, if function it should return a string that can be used for toast.success
}

    // Wrapper for the apollo useMutation, this helper adds a few extra functionality
    // to the regular useMutation.
export function useMutation(document, options) {
    const toast = useToast();
    let opt = {...defaultMutationOptions, ...options}

    const result = apolloUseMutation(document)
    result.onDone(() => {
        if (opt.variable) opt.variable.value = false;
        if (opt.onDone) toast.success(opt.onDone);
    })
    result.onError((err) => {
        if (opt.variable) opt.variable.value = false;
        console.log("Error", err)
        toast.error(err)
    })
    return result
}