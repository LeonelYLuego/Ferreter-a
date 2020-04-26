<template>
    <div id="NavBar">
        <b-navbar toggleable="lg" type="dark" id="navbar">
            <b-navbar-brand to="/">Ferretería del Parque</b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <b-nav-item to="/products">Productos</b-nav-item>
                    <b-nav-item href="#" disabled>Disabled</b-nav-item>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>

<style scoped>
#navbar{
    background-color: black;
}
</style>