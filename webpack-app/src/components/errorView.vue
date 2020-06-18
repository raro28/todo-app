<template>
    <div>
        <h2 v-if="errors.length > 0">Errors</h2>
        <hr>
        <div v-for="(detail, index) in errors" v-bind:key="index" v-bind:detail="detail">
            <error-field v-for="(value, name) in detail" v-bind:key="name" v-bind:name="name" v-bind:value="value"></error-field>
            <hr>
        </div>
    </div>
</template>

<script>
const errorField = {
    name: 'errorField',
    props: ['name', 'value'],
    template: `
        <div><strong>{{name}}:</strong> {{value}}<br /></div>
    `
};
export default {
    name: 'error-view',
    props: ['errors'],
    components: {
        errorField
    }
}
</script>